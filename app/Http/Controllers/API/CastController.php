<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileHelperController;
use App\Models\Cast;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CastController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = Cast::orderBy('created_at', 'desc')->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'cast_title' => 'required',
            'cast_desc' => 'required',
            'cast_image' => 'required',
        ]);
        $cast = new Cast();
        try {
            if ($request->cast_image) {
                $address = $this->uploadHelper->fileUpload($request->cast_image, 'assets/cast/');
                $cast->cast_image = $address ?? null;
            }
            $cast->cast_title = $request->cast_title;
            $cast->cast_desc = $request->cast_desc;
            $cast->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($cast);
    }
}
