let myApp = angular.module("myApp", []);

myApp.controller('myctrl', function($scope, $http) {

    $scope.tasks = [];

    // Fetch all tasks from backend
    $scope.getTasks = function() {
        $http.get('http://localhost:3000/tasks')
            .then(function(response) {
                $scope.tasks = response.data;
            }, function(error) {
                console.error('Error fetching tasks:', error);
            });
    };

    // Add a new task
    $scope.addTodo = function() {
        if ($scope.desc) {
            $http.post('http://localhost:3000/tasks', { taskDesc: $scope.desc })
                .then(function(response) {
                    $scope.tasks.push(response.data);
                    $scope.desc = '';
                }, function(error) {
                    console.error('Error adding task:', error);
                });
        }
    };

    // Delete a task
    $scope.deltodo = function(index) {
        const taskId = $scope.tasks[index].id;
        $http.delete(`http://localhost:3000/tasks/${taskId}`)
            .then(function() {
                $scope.tasks.splice(index, 1);
            }, function(error) {
                console.error('Error deleting task:', error);
            });
    };

    // Update task status (completed or not)
    $scope.updt = function() {
        $scope.tasks.forEach(function(task) {
            $http.put(`http://localhost:3000/tasks/${task.id}`, { status: task.status })
                .catch(function(error) {
                    console.error('Error updating task:', error);
                });
        });
    };

    // Clear all tasks
    $scope.clean = function() {
        $http.delete('http://localhost:3000/tasks')
            .then(function() {
                $scope.tasks = [];
            }, function(error) {
                console.error('Error clearing tasks:', error);
            });
    };

    // Clear completed tasks
    $scope.selecteddel = function() {
        const remainingTasks = $scope.tasks.filter(task => !task.status);
        const completedTasks = $scope.tasks.filter(task => task.status);

        // Delete each completed task individually
        completedTasks.forEach(function(task) {
            $http.delete(`http://localhost:3000/tasks/${task.id}`)
                .catch(function(error) {
                    console.error('Error deleting completed task:', error);
                });
        });

        $scope.tasks = remainingTasks;
    };

    // Remaining task count
    $scope.remaining = function() {
        let count = 0;
        angular.forEach($scope.tasks, function(task) {
            count += task.status ? 0 : 1;
        });
        return count;
    };

    // Initialize: load tasks when page loads
    $scope.getTasks();
});
