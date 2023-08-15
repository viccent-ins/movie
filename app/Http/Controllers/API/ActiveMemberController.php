<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Http\Controllers\FileHelperController;
use App\Models\ActiveMember;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Exception;

class ActiveMemberController extends BaseResponseController
{
    public function __construct()
    {
        $this->uploadHelper = new FileHelperController();
    }
    public function index(): Response
    {
        $data = ActiveMember::orderBy('created_at', 'desc')->get();
        $Result = [
            'ActiveMembers' => $data,
        ];
        return $this->responseSuccess($Result);
    }
    public function store(Request $request): Response
    {
        $request->validate([
            'member_profit' => 'required',
            'member_image' => 'required',
        ]);
        $member = new ActiveMember();
        try {
            if ($request->member_image) {
                $address = $this->uploadHelper->fileUpload($request->member_image, 'assets/active-member/');
                $member->member_image = $address ?? null;
            }
            $member_id = Carbon::now()->month . time();
            $member->member_id = $member_id;
            $member->member_profit = $request->member_profit;
            $member->save();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($member);
    }
    public function update(Request $request): Response
    {
        $request->validate([
            'member_profit' => 'required',
        ]);
        $member =  ActiveMember::findOrfail($request->id);
        try {
            if ($request->member_image) {
                $address = $this->uploadHelper->fileUpload($request->member_image, 'assets/active-member/');
                $member->member_image = $address ?? null;
            }
            $member_id = Carbon::now()->month . time();
            $member->member_id = $member_id;
            $member->member_profit = $request->member_profit;
            $member->update();
        } catch (Exception $e) {
            return Response($e->getMessage());
        }
        return $this->responseSuccess($member);
    }
    public function delete(Request $request) {
        $member = ActiveMember::where('id',$request->id)->first();
        $photo = $member->member_image;
        if($photo){
            $member->delete();
            unlink(public_path($photo));
        } else {
            $member->delete();
        }
        return $this->responseSuccess(null);
    }
}
