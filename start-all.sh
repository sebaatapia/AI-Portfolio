#!/bin/bash

echo "🚀 Starting AI Portfolio - Full Stack"
echo "======================================"

cleanup() {
    echo ""
    echo "🛑 Shutting down all servers..."
    kill $BACKEND_PID $PORTFOLIO_PID $FINANCE_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start shared backend
echo "📊 Starting shared backend server..."
cd ai-finance-backend
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
sleep 2

# Start portfolio landing page
echo "🏠 Starting portfolio landing page..."
cd ../portfolio-landing
npm start &
PORTFOLIO_PID=$!
echo "✅ Portfolio started (PID: $PORTFOLIO_PID)"
sleep 3

# Start finance advisor
echo "💰 Starting finance advisor..."
cd ../ai-finance-advisor
BROWSER=none PORT=3001 npm start &
FINANCE_PID=$!
echo "✅ Finance advisor started (PID: $FINANCE_PID)"

echo ""
echo "🎉 All servers are running!"
echo "🏠 Portfolio:      http://localhost:3000"
echo "💰 Finance Tool:   http://localhost:3001" 
echo "📊 Backend API:    http://localhost:3002"
echo ""
echo "Press Ctrl+C to stop all servers"

wait $BACKEND_PID $PORTFOLIO_PID $FINANCE_PID