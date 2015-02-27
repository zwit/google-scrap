<?php namespace App\Http\Controllers;

use App\Http\Requests\SearchFormRequest;
use Response;
use View;
use Illuminate\Http\Request;

require public_path().'/php/casperphpwrapper.php';

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

		putenv('PATH=C:/phantomjs;');
		$forge = 'js\casperjs\batchbin\casperjs.bat js\casperjs\tests\commands\mytest.js "'.$request->input('search').'"';
		if ($request->input('search') != '')
			$forge .= ' '.$request->input('page');
		exec($forge, $output);

		return Response::json( (implode($output)) );
	}

}
