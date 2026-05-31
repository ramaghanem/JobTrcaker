<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
            'role'     => 'jobseeker',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Incorrect email or password'
            ], 401);
        }

        $user  = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function googleRedirect(Request $request)
{
    // نأخذ الـ role المختار من الرياكت (إما company أو jobseeker)
    // إذا لم يختر شيئاً، نضع jobseeker كقيمة افتراضية
    $role = $request->query('register_role', 'jobseeker');

    // نرسل الـ role والـ prompt إلى جوجل
    return Socialite::driver('google')
        ->stateless()
        ->with([
            'state' => $role,
            'prompt' => 'select_account consent' // 👈 هذا السطر المضاف
        ])
        ->redirect();
}

    public function googleCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // فحص هل المستخدم موجود مسبقاً أم لا
            $user = User::where('email', $googleUser->email)->first();
            $isNew = !$user; 

            if ($isNew) {
                // هنا السحر! نقرأ الـ state الذي أرسلناه وجاءنا من جوجل لنتعرف على الـ role
                $chosenRole = $request->query('state', 'jobseeker');

                // إنشاء الحساب المبدئي بالـ role الصحيح تماماً
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'password' => bcrypt(Str::random(16)),
                    'role' => $chosenRole, 
                ]);
            }

            // توليد التوكن
            $token = $user->createToken('auth_token')->plainTextToken;

            // تحضير اسم المستخدم ليكون جاهزاً للرابط
            $name = urlencode($user->name);
            $isNewStr = $isNew ? 'true' : 'false';

            // إذا كان المستخدم جديداً، نوجهه لصفحة الـ register ليقمل بيانات الشركة إذا كان دورها كذلك
            if ($isNew) {
                return redirect()->away("http://localhost:5173/register?token={$token}&role={$user->role}&name={$name}&email={$user->email}&is_new={$isNewStr}");
            }

            // إذا كان مستخدماً قديماً، يذهب لصفحة الـ login كالمعتاد
            return redirect()->away("http://localhost:5173/login?token={$token}&role={$user->role}&name={$name}&email={$user->email}&is_new={$isNewStr}");

        } catch (\Exception $e) {
            return redirect()->away("http://localhost:5173/login?error=Google authentication failed");
        }
    }

    

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $user = $request->user()->load('company');
        return response()->json($user);
    }
}