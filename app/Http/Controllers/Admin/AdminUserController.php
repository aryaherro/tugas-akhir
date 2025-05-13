<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(User::with('roles')->paginate(10)->withQueryString()->toJson());
        return Inertia::render('admin/user', [
            'users' => fn() => User::with('roles')->paginate(10)->withQueryString(),
            'roles' =>  fn() => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        if ($request->has('roles')) {
            $user->syncRoles($request->input('roles'));
        }

        return redirect()->back()->with('success', 'User created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users,email,',
        //     'password' => 'nullable|string|min:8|confirmed',
        // ]);

        $user = User::findOrFail($id);
        if ($request->input('name') !== $user->name) {
            $request->validate([
                'name' => 'required|string|max:255|unique:users,name,' . $user->id,
            ]);
            $user->update([
                'name' => $request->input('name'),
            ]);
        }
        if ($request->input('email') !== $user->email) {
            $request->validate([
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            ]);
            $user->update([
                'email' => $request->input('email'),
            ]);
        }
        if ($request->input('password') !== '') {
            $request->validate([
                'password' => 'nullable|string|min:8|confirmed',
            ]);
            $user->update([
                'password' => Hash::make($request->input('password')),
            ]);
        }

        if ($request->has('roles')) {
            $user->syncRoles($request->input('roles'));
        }

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
