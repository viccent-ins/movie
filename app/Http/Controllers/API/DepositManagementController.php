<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\DepositManagement;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DepositManagementController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = DepositManagement::orderBy('created_at', 'desc')
            ->where('deposit_name', '=', $this->createdBy())
            ->where('deposit_is_delete', '=', 0)
            ->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'deposit_amount' => 'required',
        ]);
        $depositMember = new DepositManagement();
        try {
            $depositMember->deposit_name = $this->createdBy();
            $depositMember->deposit_amount = $request->deposit_amount;
            $depositMember->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($depositMember);
    }
}
