<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Employe;

class EmployeController extends Controller
{
    public function index(){
        $emp = Employe::all();
        return response()->json([
            'status' => 200,
            'result' => $emp
        ],200);
    }

    public function store(Request $request){
        $input = $request->all();
        $usr = new Employe();
        $usr->name = $input['name'];
        $usr->email = $input['email'];
        $usr->address = $input['address'];
        $usr->phone = $input['phone'];
        $usr->birth_date = $input['birth_date'];
        $usr->gender = $input['gender'];
        $usr->job_title = $input['job_title'];
        $usr->save();
        return response()->json([
            'msg' => 'Employee added successfully',
            'status' => 200
        ]);
    }

    public function update($id){
        $usr = Employe::find($id);
        $input = $request->all();
        if($usr){
            $usr->name = $input['name'];
            $usr->email = $input['email'];
            $usr->address = $input['address'];
            $usr->phone = $input['phone'];
            $usr->birth_date = $input['birth_date'];
            $usr->gender = $input['gender'];
            $usr->job_title = $input['job_title'];
            $usr->save();
            return response()->json([
                'msg' => 'updated successfully',
                'status' => 200
            ]);
        }else{
            return response()->json([
                'msg' => "Something went wrong!",
                'status' => 400
            ]);
        }
    }

    public function delete($id){
        $users = Employe::find($id);
        if($users){
            $users->delete();
            return response()->json([
                'msg' => 'Delete successfully',
                'data' => $id,
                'status' => 200
            ]);
        }
    }

    public function show($id){
        $users = Employe::find($id);
        if($users){
            return response()->json([
                'msg' => 'get successfully',
                'data' => $users,
                'status' => 200
            ]);
        }else{
            return response()->json([
                'msg' => "Something went wrong!",
                'status' => 400
            ]);
        }
    }

}
