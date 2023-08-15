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
        $Result = [
            'QuestCorridor' => $data,
        ];
        return $this->responseSuccess($Result);
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
            return Response($e->getMessage());
        }
        $Result = [
            'ActiveMembers' => $questCorridor,
        ];
        return $this->responseSuccess($Result);
    }
    public function update(Request $request): Response
    {
        $request->validate([
            'level' => 'required',
            'amount' => 'required',
            'percentage' => 'required',
            'return' => 'required',
        ]);
        $questCorridor = QuestCorridor::findOrfail($request->id);
        try {
            if ($request->file) {
                $address = $this->uploadHelper->fileUpload($request->file, 'assets/quest-corridor/');
                $questCorridor->file = $address;
            }
            $questCorridor->level = $request->level;
            $questCorridor->amount = $request->amount;
            $questCorridor->percentage = $request->percentage;
            $questCorridor->return = $request->return;
            $questCorridor->update();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        $Result = [
            'QuestCorridor' => $questCorridor,
        ];
        return $this->responseSuccess($Result);
    }
    public function delete(Request $request) {
        $questCorridor = QuestCorridor::where('id',$request->id)->first();
        $photo = $questCorridor->file;
        if($photo){
            $questCorridor->delete();
            unlink(public_path($photo));
        } else {
            $questCorridor->delete();
        }
        return $this->responseSuccess(null);
    }
}
