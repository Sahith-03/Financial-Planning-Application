"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AlertCircle, BarChart3, BookOpen, Building, DollarSign, PiggyBank, Plus, Target, TrendingUp, User, QrCode, Smartphone } from "lucide-react"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdvancedFinancialPlannerPlus() {
  const [incomeType, setIncomeType] = useState('salaried')
  const [income, setIncome] = useState(8500)
  const [expenses, setExpenses] = useState(5200)
  const [investmentRisk, setInvestmentRisk] = useState(50)
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [upiId, setUpiId] = useState('')
  const { toast } = useToast()

  const getFinancialAdvice = () => {
    switch (incomeType) {
      case 'salaried':
        return "Focus on maximizing your 401(k) contributions and consider opening a Roth IRA for tax-free growth. Aim to save at least 20% of your income."
      case 'business':
        return "Look into SEP IRA or Solo 401(k) options for tax-advantaged retirement savings. Consider reinvesting profits for business growth and diversifying your personal investments."
      case 'investor':
        return "Maintain a diversified portfolio across various asset classes. Consider tax-efficient investment strategies and regularly rebalance your portfolio to maintain your target asset allocation."
      default:
        return "Select your income type for personalized advice."
    }
  }

  const calculateROI = () => {
    const monthlyRate = expectedReturn / 12 / 100
    let futureValue = initialInvestment
    for (let i = 0; i < years * 12; i++) {
      futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate)
    }
    const totalContributions = initialInvestment + (monthlyContribution * years * 12)
    const roi = ((futureValue - totalContributions) / totalContributions) * 100
    return { futureValue: Math.round(futureValue), roi: roi.toFixed(2) }
  }

  const { futureValue, roi } = calculateROI()

  const wealthForecastData = Array.from({ length: years }, (_, i) => {
    const yearValue = calculateROI().futureValue
    return { year: i + 1, value: yearValue }
  })

  const expenseData = [
    { name: 'Housing', value: 1820, category: 'Essential' },
    { name: 'Transportation', value: 780, category: 'Essential' },
    { name: 'Food', value: 1040, category: 'Essential' },
    { name: 'Utilities', value: 520, category: 'Essential' },
    { name: 'Entertainment', value: 1040, category: 'Discretionary' },
  ]

  const handleEnter = () => {
    toast({
      title: "Financial Information Updated",
      description: `Income Type: ${incomeType}, Monthly Income: $${income}, Monthly Expenses: $${expenses}`,
    })
  }

  const handleUPIPayment = () => {
    toast({
      title: "UPI Payment Initiated",
      description: `Payment sent to UPI ID: ${upiId}`,
    })
  }

  const calculateSavingsPrediction = () => {
    const totalIncome = income
    const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.value, 0)
    const potentialSavings = totalIncome - totalExpenses
    const savingsRate = (potentialSavings / totalIncome) * 100
    return { potentialSavings, savingsRate: savingsRate.toFixed(2) }
  }

  const { potentialSavings, savingsRate } = calculateSavingsPrediction()

  const getInvestmentSuggestions = () => {
    if (incomeType === 'salaried') {
      return [
        { name: "Index Fund", risk: "Low", return: "7-10%", duration: "5+ years" },
        { name: "401(k)", risk: "Moderate", return: "8-12%", duration: "Until retirement" },
        { name: "Roth IRA", risk: "Varies", return: "7-10%", duration: "Until retirement" },
      ]
    } else if (incomeType === 'business') {
      return [
        { name: "SEP IRA", risk: "Moderate", return: "8-12%", duration: "Until retirement" },
        { name: "Real Estate", risk: "High", return: "8-15%", duration: "5-10+ years" },
        { name: "Business Reinvestment", risk: "High", return: "Varies", duration: "Ongoing" },
      ]
    } else {
      return [
        { name: "Dividend Stocks", risk: "Moderate", return: "4-6%", duration: "5+ years" },
        { name: "REITs", risk: "Moderate", return: "5-10%", duration: "5+ years" },
        { name: "Corporate Bonds", risk: "Low", return: "3-5%", duration: "1-10 years" },
      ]
    }
  }

  const investmentSuggestions = getInvestmentSuggestions()

  const comparativeInvestmentPlans = [
    { name: "Conservative", stocks: 40, bonds: 50, cash: 10, expectedReturn: 5 },
    { name: "Balanced", stocks: 60, bonds: 30, cash: 10, expectedReturn: 7 },
    { name: "Aggressive", stocks: 80, bonds: 15, cash: 5, expectedReturn: 9 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Advanced Financial Planner Plus</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income Type</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Select value={incomeType} onValueChange={setIncomeType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select income type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salaried">Salaried</SelectItem>
                <SelectItem value="business">Business Owner</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="text-2xl font-bold"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="text-2xl font-bold"
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end mb-8">
        <Button onClick={handleEnter}>Enter</Button>
      </div>

      <Tabs defaultValue="planning" className="space-y-4">
        <TabsList>
          <TabsTrigger value="planning">Income Planning</TabsTrigger>
          <TabsTrigger value="expenses">Expense Tracking</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="upi">UPI Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Income-Based Financial Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{getFinancialAdvice()}</p>
              <div className="space-y-4">
                <div>
                  <Label>Recommended Savings Rate</Label>
                  <Progress value={20} className="w-full mt-2" />
                  <p className="text-sm text-muted-foreground mt-1">Aim to save 20% of your income</p>
                </div>
                <div>
                  <Label>Recommended Investment Allocation</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div>
                      <div className="text-sm font-medium">Stocks</div>
                      <Progress value={60} className="w-full mt-1" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Bonds</div>
                      <Progress value={30} className="w-full mt-1" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Cash</div>
                      <Progress value={10} className="w-full mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Savings Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Based on your income and expenses:</p>
              <p className="font-bold mt-2">Potential Monthly Savings: ${potentialSavings}</p>
              <p className="font-bold">Savings Rate: {savingsRate}%</p>
              <Progress value={parseFloat(savingsRate)} className="w-full mt-2" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <Label>Expense Categories</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {expenseData.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{expense.name}</span>
                      <span className="font-bold">${expense.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Investment Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentSuggestions.map((suggestion, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="font-bold">{suggestion.name}</h3>
                    <p>Risk: {suggestion.risk}</p>
                    <p>Expected Return: {suggestion.return}</p>
                    <p>Recommended Duration: {suggestion.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Comparative Investment Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparativeInvestmentPlans.map((plan, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <h3 className="font-bold">{plan.name}</h3>
                    <div className="flex justify-between mt-2">
                      <div>
                        <p>Stocks: {plan.stocks}%</p>
                        <p>Bonds: {plan.bonds}%</p>
                        <p>Cash: {plan.cash}%</p>
                      </div>
                      <div>
                        <p>Expected Return: {plan.expectedReturn}%</p>
                      </div>
                    </div>
                    <Progress value={plan.stocks} 
                    className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upi">
          <Card>
            <CardHeader>
              <CardTitle>UPI Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleUPIPayment} className="flex-1">
                    <Smartphone className="mr-2 h-4 w-4" /> Pay using UPI ID
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <QrCode className="mr-2 h-4 w-4" /> Scan QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex space-x-4">
        <Button>
          <Target className="mr-2 h-4 w-4" /> Set Financial Goals
        </Button>
        <Button variant="outline">
          <BookOpen className="mr-2 h-4 w-4" /> Financial Education Resources
        </Button>
      </div>
    </div>
  )
}