from mcp.server.fastmcp import FastMCP

# Initialize the FastMCP server
mcp = FastMCP(name="intellidesk-tools")

@mcp.tool()
def get_task_details(task_id: str, include_subtasks: bool = True) -> str:
    """
    Retrieve detailed metadata for a specific workspace task.
    
    Args:
        task_id: The unique identifier of the task (e.g., 'TASK-2.1.1').
        include_subtasks: Whether to fetch nested subtasks along with the main task.
    """
    try:
        # Simulate validation for parameter mismatch or invalid ID format
        if not task_id or not task_id.startswith("TASK-"):
            raise ValueError(f"Invalid task_id format: '{task_id}'. Expected format starting with 'TASK-'.")
        
        subtask_status = "including all subtasks" if include_subtasks else "main task only"
        return f"Fetching details for task ID: {task_id} ({subtask_status})"
        
    except Exception as e:
        # FastMCP serializes this exception into a standard JSON-RPC error response
        return f"Error Code -400: Failed to retrieve task details. Details: {str(e)}"

if __name__ == "__main__":
    mcp.run()