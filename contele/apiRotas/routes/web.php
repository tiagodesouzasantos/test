<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['prefix' => 'apiRoutes'], function () {
    Route::get('/', function () {
        return response()->json(['message'=>'API LARAVEL','status'=>'Connected']);
    });
    
    Route::post('auth/register', 'UserController@register');
    Route::post('auth/login', 'UserController@login');
    
    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::resource('userRoutes', 'UserRoutesController');
        Route::resource('listMaps', 'ListMapsController');
        Route::get('user', 'UserController@getAuthUser');
    });
            
        });
Route::get('/', function () {
    return redirect('apiRoutes');
    // return view('welcome');
});
