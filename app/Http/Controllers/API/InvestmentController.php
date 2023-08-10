<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\Investment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvestmentController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = Investment::orderBy('created_at', 'desc')->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'gmg_name' => 'required',
            'gmg_increase_stock' => 'required',
            'gmg_percentage' => 'required',
            'gmg_file' => 'required',
            'gmg_people' => 'required',
        ]);
        $cast = new Investment();
        try {
            if ($request->gmg_file) {
                $address = $this->uploadHelper->fileUpload($request->gmg_file, 'assets/cast/');
                $cast->gmg_file = $address ?? null;
            }
            $cast->gmg_name = $request->gmg_name;
            $cast->gmg_people = $request->gmg_people;
            $cast->gmg_percentage = $request->gmg_percentage;
            $cast->gmg_increase_stock = $request->gmg_increase_stock;
            $cast->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($cast);
    }
}
