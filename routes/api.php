<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
Route::controller(\App\Http\Controllers\API\QuestCorridorController::class)->group(function () {
    Route::get('getQuestCorridor', 'index');
    Route::post('addQuestCorridor', 'store');
    Route::post('updateQuestCorridor', 'update');
    Route::post('deleteQuestCorridor', 'delete');
});
Route::controller(\App\Http\Controllers\API\ActiveMemberController::class)->group(function () {
    Route::get('getActiveMember', 'index');
    Route::post('addActiveMember', 'store');
    Route::post('updateActiveMember', 'update');
    Route::post('deleteActiveMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\CooperateFilmController::class)->group(function () {
    Route::get('getCooperateFiles', 'index');
    Route::post('addCooperateFile', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\DetailBannerController::class)->group(function () {
    Route::get('getBannerDetail', 'index');
    Route::post('addBannerDetail', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\CastController::class)->group(function () {
    Route::get('getCasts', 'index');
    Route::post('addCast', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\BlockBusterController::class)->group(function () {
    Route::get('getBlockBusters', 'index');
    Route::post('addBlockBuster', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\InvestmentController::class)->group(function () {
    Route::get('getInvestments', 'index');
    Route::post('addInvestment', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\DepositManagementController::class)->group(function () {
    Route::post('getDeposits', 'index');
    Route::post('addDeposit', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
Route::controller(\App\Http\Controllers\API\WithdrawalManagementController::class)->group(function () {
    Route::post('getWithdrawals', 'index');
    Route::post('addWithdrawal', 'store');
//    Route::post('updateMember', 'update');
//    Route::post('deleteMember', 'delete');
});
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
