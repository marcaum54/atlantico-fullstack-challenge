<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <title>Atlântico Fullstack Challenge</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        html {
            overflow-y: scroll;
        }

        .table th,
        .table td {
            vertical-align: middle;
        }

    </style>
</head>

<body>
    <div id="app" class="pb-5"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
