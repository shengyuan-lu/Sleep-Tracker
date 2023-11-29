#!/bin/zsh

# Function to check if the current directory is an Ionic project
is_ionic_project() {
    if [ -f "ionic.config.json" ]; then
        return 0
    else
        return 1
    fi
}

# Function to check if a port is in use
is_port_in_use() {
    local port=$1
    lsof -i :$port > /dev/null
}

# Function to find and kill the process using a specific port
kill_process_using_port() {
    local port=$1
    local process_id=$(lsof -ti :$port)
    if [ -n "$process_id" ]; then
        kill $process_id
        echo "Killed process using port $port (PID: $process_id)"
    else
        echo "No process found using port $port"
    fi
}

# Main script
if is_ionic_project; then
    if is_port_in_use 8100; then
        echo "Port 8100 is already in use."
        echo "Killing the process using port 8100..."
        kill_process_using_port 8100
    fi

    echo "Starting Ionic server..."
    ionic serve

    # Open in the default browser
    xdg-open "http://localhost:8100" &

else
    echo "Not an Ionic project. Exiting..."
fi
