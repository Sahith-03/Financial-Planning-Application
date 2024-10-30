"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { BarChart3, BookOpen, Building, Target, TrendingUp, User } from "lucide-react"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdvancedDashboard() {
  const [incomeType, setIncomeType] = useState('salaried')
  const [income, setIncome] = useState(8500)
  const [expenses, setExpenses] = useState(5200)
  const [investmentRisk, setInvestmentRisk] = useState(50)
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(7)
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
    { name: 'Housing', value: 1820 },
    { name: 'Transportation', value: 780 },
    { name: 'Food', value: 1040 },
    { name: 'Utilities', value: 520 },
    { name: 'Entertainment', value: 1040 },
  ]

  const handleEnter = () => {
    // Here you can add logic to process the entered data
    toast({
      title: "Financial Information Updated",
      description: `Income Type: ${incomeType}, Monthly Income: $${income}, Monthly Expenses: $${expenses}`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Advanced Financial Planner</h1>

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
          <TabsTrigger value="business">Business Growth</TabsTrigger>
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
                <Label>Budget vs. Actual Spending</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={expenseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Actual" fill="#8884d8" />
                    <Bar dataKey="budget" name="Budget" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>ROI Calculator and Investment Growth Planner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-4">
                <div>
                  <Label>Initial Investment</Label>
                  <Input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Monthly Contribution</Label>
                  <Input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Years</Label>
                  <Input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Expected Annual Return (%)</Label>
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p>Future Value: ${futureValue.toLocaleString()}</p>
                <p>Return on Investment: {roi}%</p>
              </div>
              <div className="mt-4">
                <Label>Wealth Forecast</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={wealthForecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Growth Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Real Estate Investment Planning</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Input placeholder="Property Value" />
                    </div>
                    <div>
                      <Input placeholder="Expected Rental Income" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Private Ventures</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select growth stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Start-up</SelectItem>
                      <SelectItem value="scaling">Scaling</SelectItem>
                      <SelectItem value="expansion">Expansion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Building className="mr-2 h-4 w-4" /> Generate Business Growth Plan
                </Button>
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