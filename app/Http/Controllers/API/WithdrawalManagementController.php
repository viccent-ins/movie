<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileHelperController;
use App\Models\WithdrawalManagement;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WithdrawalManagementController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = WithdrawalManagement::orderBy('created_at', 'desc')
            ->where('withdrawal_name', '=', $this->createdBy())
            ->where('withdrawal_is_delete', '=', 0)
            ->get();
        return $this->responseSuccess($data);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'withdrawal_amount' => 'required',
        ]);
        $withdrawalMember = new WithdrawalManagement();
        try {
            $withdrawalMember->withdrawal_name = $this->createdBy();
            $withdrawalMember->withdrawal_amount = $request->withdrawal_amount;
            $withdrawalMember->withdrawal_credit_type = $request->withdrawal_credit_type;
            $withdrawalMember->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($withdrawalMember);
    }
}
