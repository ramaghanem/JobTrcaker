<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use OpenAI\Laravel\Facades\OpenAI;
use Smalot\PdfParser\Parser;

class CvMatchController extends Controller
{
    public function match(JobApplication $jobApplication)
    {
        $job    = $jobApplication->job;
        $cvPath = storage_path('app/public/' . $jobApplication->cv);

        if (!file_exists($cvPath)) {
            return response()->json(['message' => 'CV file not found'], 404);
        }

        $parser = new Parser();
        $pdf    = $parser->parseFile($cvPath);
        $cvText = $pdf->getText();

        if (empty(trim($cvText))) {
            return response()->json(['message' => 'Could not extract text from CV'], 422);
        }

        $response = OpenAI::chat()->create([
            'model'    => 'gpt-4',
            'messages' => [
                [
                    'role'    => 'system',
                    'content' => 'You are an expert HR assistant. Analyze the CV against the job description and return ONLY a valid JSON object with these keys: score (integer 0-100), strengths (array of strings), weaknesses (array of strings), summary (string). No extra text, just JSON.'
                ],
                [
                    'role'    => 'user',
                    'content' => "Job Title: {$job->title}\n\nJob Description:\n{$job->description}\n\nCV Content:\n{$cvText}"
                ]
            ],
        ]);
        
        $content = $response->choices[0]->message->content;
        $content = preg_replace('/```json|```/', '', $content);
        $result  = json_decode(trim($content), true);
        
    

        return response()->json($result);
    }
}