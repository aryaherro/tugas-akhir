<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminRoleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/tes', function () {
    return Inertia::render('tes');
})->name('tes');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
// Route::group(['middleware' => ['role:admin']], function () {
//     // Route::resource(
//     //     [
//     //         'user' => UserController::class,
//     //         'permission' => PermissionController::class,
//     //         'role' => RoleController::class,
//     //     ]
//     // );
Route::middleware(['role:admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::resource('users', AdminUserController::class)->except(['show', 'create', 'edit']);
        Route::resource('permissions', AdminPermissionController::class)->except(['show', 'create', 'edit']);
        Route::resource('roles', AdminRoleController::class)->except(['show', 'create', 'edit']);
    });
});

//  });
// Route::resource('permission', AdminUserController::class);




require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
