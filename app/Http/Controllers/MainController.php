<?php

namespace App\Http\Controllers;
use App\Models\Main\Header;
use Illuminate\Http\Request;

class MainController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $menus = Header::all();


        return view('page.main.main', compact('menus'));


    }
}
