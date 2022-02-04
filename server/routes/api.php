<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DiaryController;

Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::post('add-diary', [DiaryController::class, 'store']);

Route::get('view-diary', [DiaryController::class, 'index']);

Route::get('edit-diary/{id}', [DiaryController::class, 'edit']);

Route::post('update-diary/{id}', [DiaryController::class, 'update']);

Route::delete('delete-diary/{id}', [DiaryController::class, 'remove']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

