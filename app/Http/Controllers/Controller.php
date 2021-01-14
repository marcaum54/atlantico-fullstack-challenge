<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use stdClass;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index()
    {
        $rows = $this->model->paginate(20);
        return response()->json($rows);
    }

    public function show($uuid)
    {
        $row = $this->model->where('uuid', $uuid)->firstOrFail();
        return response()->json($row);
    }

    public function destroy($uuid)
    {
        $row = $this->model->where('uuid', $uuid)->firstOrFail();
        $row->delete();

        return response(null, 204);
    }
}
