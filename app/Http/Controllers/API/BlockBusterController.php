<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\BlockBuster;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BlockBusterController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
            $data = BlockBuster::orderBy('created_at', 'desc')->get();
            return $this->responseSuccess($data);
    }
        public function store(Request $request): Response
    {
        $request->validate([
            'block_title' => 'required',
            'block_desc' => 'required',
            'block_amount_people' => 'required',
            'block_end_date' => 'required',
            'block_file' => 'required',
        ]);
        $block = new BlockBuster();
        try {
            if ($request->block_file) {
                $address = $this->uploadHelper->fileUpload($request->block_file, 'assets/block-buster/');
                $block->block_file = $address;
            }
            $block->block_title = $request->block_title;
            $block->block_desc = $request->block_desc;
            $block->block_amount_people = $request->block_amount_people;
            $block->block_end_date = $request->block_end_date;
            $block->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($block);
    }
}
