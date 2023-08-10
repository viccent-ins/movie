<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseResponseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseResponseController
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('phone', 'password');
        $token = Auth::attempt($credentials);
        if (!$token) {
            return $this->responseUnAuthorize();
        }
        return $this->responseToken($token);
    }

    public function register(Request $request): Response
    {
        $request->validate([
            'phone' => 'required',
            'nick_name' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $inputValues['phone'] = $request->phone;
        // checking if email exists in ‘email’ in the ‘users’ table
        $rules = array('phone' => 'unique:users,phone');
        $validator = Validator::make($inputValues, $rules);

        if ($validator->fails()) {
            return Response(['Message' => 'The phone already exists'], 200);
        }
        $user = User::create([
            'phone' => $request->phone,
            'password' => bcrypt($request->password),
            'nick_name' => $request->nick_name,
            'email' => $request->email,
            'referral_code' => $request->referral_code,
            'role' => 'normal',
        ]);
        $token = Auth::login($user);
        return $this->responseToken($token);
    }

    public function logout(): Response
    {
        Auth::logout();
        return $this->responseSuccess(null);
    }

    public function refresh(): Response
    {
        return $this->responseToken(auth('api')->refresh());
    }
    protected function responseToken($token): Response
    {
        $data = [
            'Authorization' => [
                'token' => $token,
                'type' => auth()->user()->role,
                'expires_in' => auth()->factory()->getTTL() * 7, //todo: 1week
            ]
        ];
        return $this->responseSuccess($data, 0, 201);
    }

}
