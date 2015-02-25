<?php namespace App\Http\Controllers;

use App\Http\Requests\SearchFormRequest;
use Response;
use View;
use Illuminate\Http\Request;

class SearchController extends Controller {

	public function __construct()
	{
		$this->middleware('guest');
	}

	public function index()
	{
		return view('search');
	}

	public function scrap(Request $request)
	{
		$this->validate($request, [
			'search' => 'required',
		]);
		//return Response::make('Search done !');
		return view('search');
	}

}
