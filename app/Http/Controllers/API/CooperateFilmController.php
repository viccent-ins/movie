<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\CooperateFilm;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CooperateFilmController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response {
        $data = CooperateFilm::orderBy('created_at', 'desc')->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'cooperate_file' => 'required',
        ]);
        $cooperate = new CooperateFilm();
        try {
            if ($request->cooperate_file) {
                $address = $this->uploadHelper->fileUpload($request->cooperate_file, 'assets/cooperate-film/');
                $cooperate->cooperate_file = $address;
                $cooperate->save();
            }
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($cooperate);
    }
}
