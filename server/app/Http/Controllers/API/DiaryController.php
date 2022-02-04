<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Diary;
use Illuminate\Support\Facades\Validator;

class DiaryController extends Controller
{

    public function index(){
        $diarys = Diary::all();
        return response()->json([
            'status' => 200,
            'diarys' => $diarys
        ]);
    }

    public function edit($id){
        $diary = Diary::find($id);
        if($diary){
            return response()->json([
                'status'=> 200,
                'message'=> $diary
            ]);
        }else{
            return response()->json([
                'status'=> 404,
                'message'=> 'No diary found'
            ]);
        }
    }

    public function update(Request $request, $id){
        $diary = Diary::find($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:191',
            'date' => 'required|max:191',
            'desc' => 'required|min:1',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }else{

        if($diary){

        $diary -> title = $request->input('title');
        $diary -> date = $request->input('date');
        $diary -> desc = $request->input('desc');
        $diary->update();

        return response()->json([
            'status' => 200,
            'message' => 'Diary Updated Successfully',
        ]);
    }else{
        return response()->json([
            'status' => 404,
            'message' => 'Diary Not Found',
        ]);   
    }
    }
    }

    public function remove($id){
        $diary = Diary::find($id);
        $diary->delete();

        return response()->json([
            'status'=>200,
            'message' => "Diary Deleted Successfully"
        ]);
    }



    public function store(Request $request){
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:191',
            'date' => 'required|max:50',
            'desc' => 'required|min:1',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }
        
        $diary = new Diary;
        $diary -> title = $request->input('title');
        $diary -> date = $request->input('date');
        $diary -> desc = $request->input('desc');
        $diary->save();

        return response()->json([
            'status' => 200,
            'message' => 'Diary Added Successfully',
        ]);
    }
}
