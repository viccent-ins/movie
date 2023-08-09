<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\QuestCorridor;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Exception;

class QuestCorridorController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = QuestCorridor::orderBy('created_at', 'desc')->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'level' => 'required',
            'amount' => 'required',
            'percentage' => 'required',
            'return' => 'required',
        ]);
        $questCorridor = new QuestCorridor();
        try {
            if ($request->file) {
                $address = $this->uploadHelper->fileUpload($request->file, 'assets/quest-corridor/');
                $questCorridor->file = $address;
            }
            $questCorridor->level = $request->level;
            $questCorridor->amount = $request->amount;
            $questCorridor->percentage = $request->percentage;
            $questCorridor->return = $request->return;
            $questCorridor->save();
        } catch (Exception $e) {
            return $e->getMessage();
        }
        return $this->responseSuccess($questCorridor);
    }
}
