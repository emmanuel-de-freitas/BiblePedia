#!/bin/bash

# Setup Python virtual environment for Livrea
# This script creates and configures a Python virtual environment with optional dependencies

set -e

echo "Setting up Python virtual environment for Livrea..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
    echo "Virtual environment created at .venv/"
else
    echo "Virtual environment already exists at .venv/"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
    echo "Dependencies installed successfully!"
else
    echo "No requirements.txt found. Skipping dependency installation."
fi

# Create src-python directory if it doesn't exist
if [ ! -d "src-tauri/src-python" ]; then
    echo "Creating src-tauri/src-python directory..."
    mkdir -p src-tauri/src-python
fi

# Check if main.py exists
if [ ! -f "src-tauri/src-python/main.py" ]; then
    echo "Warning: src-tauri/src-python/main.py not found!"
    echo "Please ensure the Python module file exists for the Tauri plugin to work."
fi

# Update tauri.conf.json to include venv resources if using PyO3
echo ""
echo "Setup complete!"
echo ""
echo "To use the virtual environment:"
echo "  source .venv/bin/activate"
echo ""
echo "To use PyO3 instead of RustPython (for better library support):"
echo "  1. Update Cargo.toml to include: tauri-plugin-python = { version=\"0.3\", features = [\"pyo3\"] }"
echo "  2. Add venv resources to tauri.conf.json:"
echo '     "resources": ['
echo '       "src-python/",'
echo '       "../.venv/include/",'
echo '       "../.venv/lib/"'
echo '     ]'
echo ""
echo "For production builds with PyO3, consider using PyOxidizer for static linking."
