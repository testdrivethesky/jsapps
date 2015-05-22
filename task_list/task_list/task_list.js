var task_list = [];

var $ = function (id) { return document.getElementById(id); }

var update_task_list = function () {
    if ( task_list.length == 0 ) {
        $("task_list").value = "";
    } else {
        var list = "";
        for ( var i in task_list ) {
            list += (parseInt(i)+1) + ": " + task_list[i] + "\n";
        }
        $("task_list").value = list;
    }
}

var add_task_click = function () {
    $("add_task").blur();
    var task = prompt("Enter a task:", "");
    if ( task != "" && task != null) {
        task_list.push(task)
        update_task_list();
    }
}

var delete_task_click = function () {
    $("delete_task").blur();
    if ( task_list.length == 0 ) {
        alert("No task to delete.");
        return;
    }
     var to_delete = prompt("Enter the task number to delete:", "");
    if (to_delete == null) { return; }
    to_delete = parseInt(to_delete);
    if ( isNaN(to_delete) ) {
        alert("You did not enter a number.");
        return;
    }
    if ( to_delete < 1 ) {
        alert("The task number is too low.");
        return;
    }
    if ( to_delete > task_list.length ) {
        alert("The task number is too high.");
        return;
    }
    to_delete--; 
	//task_list.shift();
    update_task_list();
}

var modify_task_click = function () {
    $("modify_task").blur();
    var modify_task = prompt("Enter the task number to be modified:", "");
	if (modify_task == null) { return; }
	modify_task = parseInt(modify_task);
	if ( isNaN(modify_task) ) {
		alert("You did not enter a number.");
        return;
		}
	if ( modify_task < 1 ) {
        alert("The task number is too low.");
        return;
    }
    if ( modify_task > task_list.length ) {
        alert("The task number is too high.");
        return;
	}
	else {
		var changes = prompt("Modify the selected task:", task_list[modify_task - 1] );
		task_list.splice( modify_task-1 , 1 , changes );
		//array.splice(index,howmany,item1,.....,itemX) 
		update_task_list();
	}
}	
	
	
var promote_task_click = function () {
    $("promote_task").blur();
    var promote_task = prompt("Enter the task number to be promoted:", "");
	if (promote_task == null) { return; }
	promote_task = parseInt(promote_task);
	if ( isNaN(promote_task) ) {
		alert("You did not enter a number.");
        return;
		}
	if ( promote_task < 1 ) {
        alert("The task number is too low.");
        return;
    }
    if ( promote_task > task_list.length ) {
        alert("The task number is too high.");
        return;
	}
	else {
		promote_task--;
		task = task_list.splice( promote_task, 1);
		task_list.unshift(task);
		update_task_list();
	}
}
	
window.onload = function() {
    $("add_task").onclick = add_task_click;
    $("delete_task").onclick = delete_task_click;
	$("modify_task").onclick = modify_task_click;
	$("promote_task").onclick = promote_task_click;
    update_task_list();
}