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
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);
        if (!$token) {
            return $this->responseUnAuthorize();
        }
        return $this->responseToken($token);
    }

    public function register(Request $request): Response
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed',
            'email' => 'required|string|',
        ]);
        $inputValues['email'] = $request->email;
        // checking if email exists in ‘email’ in the ‘users’ table
        $rules = array('email' => 'unique:users,email');
        $validator = Validator::make($inputValues, $rules);

        if ($validator->fails()) {
            return Response(['Message' => 'The email already exists'], 200);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'normal',
            'password' => bcrypt($request->password),
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
