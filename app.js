var app = angular.module("myApp", []);
app.controller("myctrl", function ($scope, $http) {
    $scope.tasks = []var app = angular.module("myApp", []);
app.controller("myctrl", function ($scope, $http) {
    $scope.tasks = [];

    // Load tasks from server
    $http.get('/api/tasks').then(function (res) {
        $scope.tasks = res.data;
    });

    // Add task
    $scope.addTodo = function () {
        if ($scope.desc) {
            const newTask = { taskDesc: $scope.desc, status: false };
            $http.post('/api/tasks', newTask).then(function (res) {
                $scope.tasks.push(res.data);
                $scope.desc = '';
            });
        }
    };

    // Delete task
    $scope.deltodo = function (index) {
        const id = $scope.tasks[index]._id;
        $http.delete('/api/tasks/' + id).then(function () {
            $scope.tasks.splice(index, 1);
        });
    };

    // Update task status
    $scope.updt = function () {
        $scope.tasks.forEach(task => {
            $http.put('/api/tasks/' + task._id, task);
        });
    };

    // Count remaining tasks
    $scope.remaining = function () {
        return $scope.tasks.filter(t => !t.status).length;
    };

    // Clear all tasks
    $scope.clean = function () {
        const promises = $scope.tasks.map(task =>
            $http.delete('/api/tasks/' + task._id)
        );
        Promise.all(promises).then(() => {
            $scope.tasks = [];
            $scope.$apply();
        });
    };

    // Delete only completed
    $scope.selecteddel = function () {
        const remainingTasks = [];
        const promises = $scope.tasks.map(task => {
            if (task.status) {
                return $http.delete('/api/tasks/' + task._id);
            } else {
                remainingTasks.push(task);
                return Promise.resolve();
            }
        });
        Promise.all(promises).then(() => {
            $scope.tasks = remainingTasks;
            $scope.$apply();
        });
    };
});


    // Load tasks from server
    $http.get('/api/tasks').then(function (res) {
        $scope.tasks = res.data;
    });

    // Add task
    $scope.addTodo = function () {
        if ($scope.desc) {
            const newTask = { taskDesc: $scope.desc, status: false };
            $http.post('/api/tasks', newTask).then(function (res) {
                $scope.tasks.push(res.data);
                $scope.desc = '';
            });
        }
    };

    // Delete task
    $scope.deltodo = function (index) {
        const id = $scope.tasks[index]._id;
        $http.delete('/api/tasks/' + id).then(function () {
            $scope.tasks.splice(index, 1);
        });
    };

    // Update task status
    $scope.updt = function () {
        $scope.tasks.forEach(task => {
            $http.put('/api/tasks/' + task._id, task);
        });
    };

    // Count remaining tasks
    $scope.remaining = function () {
        return $scope.tasks.filter(t => !t.status).length;
    };

    // Clear all tasks
    $scope.clean = function () {
        const promises = $scope.tasks.map(task =>
            $http.delete('/api/tasks/' + task._id)
        );
        Promise.all(promises).then(() => {
            $scope.tasks = [];
            $scope.$apply();
        });
    };

    // Delete only completed
    $scope.selecteddel = function () {
        const remainingTasks = [];
        const promises = $scope.tasks.map(task => {
            if (task.status) {
                return $http.delete('/api/tasks/' + task._id);
            } else {
                remainingTasks.push(task);
                return Promise.resolve();
            }
        });
        Promise.all(promises).then(() => {
            $scope.tasks = remainingTasks;
            $scope.$apply();
        });
    };
});
