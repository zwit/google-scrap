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
			$forge .= ' '.($request->input('page')-1)*10;
		exec($forge, $output);

		//var_dump($output);

		/*$casper = new \Browser\Casper();
		$casper->setPath(public_path().'/php');
		$casper->start("http://google.fr/");
		$casper->fillForm(
			'form[action="/search"]',
			array(
				'q' => 'search'
			),
			true);

		var_dump($casper->run());
		var_dump($casper->getRequestedUrls());
		//var_dump($casper->getOutput());*/

		//var_dump($output);
		//var_dump(json_decode(implode($output)));

		//return View::make('search', array('results' => json_decode(implode($output))));

		return Response::json( (implode($output)) );
	}

}
