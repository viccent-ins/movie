<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\DetailBanner;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;

class DetailBannerController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = DetailBanner::orderBy('created_at', 'desc')->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'ban_title' => 'required',
            'ban_star' => 'required',
            'ban_desc' => 'required',
            'ban_minute' => 'required'
        ]);
        $detail = new DetailBanner();
        try {
            if ($request->ban_file) {
                $address = $this->uploadHelper->fileUpload($request->ban_file, 'assets/detail/');
                $detail->ban_file = $address;
            }
            if ($request->ban_bg_file) {
                $address = $this->uploadHelper->fileUpload($request->ban_bg_file, 'assets/detail/');
                $detail->ban_bg_file = $address;
            }
            $detail->ban_title = $request->ban_title;
            $detail->ban_star = $request->ban_star;
            $detail->ban_desc = $request->ban_desc;
            $detail->ban_minute = $request->ban_minute;
            $detail->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($detail);

    }
}
