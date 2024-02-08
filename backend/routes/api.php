<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/employe', [EmployeController::class, 'index']);
Route::get('/getEmploye/{id}', [EmployeController::class, 'show']);
Route::post('/addemp', [EmployeController::class, 'store']);
Route::put('/updateemp', [EmployeController::class, 'update']);
Route::delete('/deleteemp/{id}', [EmployeController::class, 'delete']);
