"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Gift,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Mock data for wallet
const walletData = {
  balance: 1250,
  credits: 5,
  currency: 'USD'
};

// Mock transaction history
const transactions = [
  {
    id: '1',
    type: 'credit',
    amount: 500,
    description: 'Added credits for mentor sessions',
    date: '2024-01-15',
    status: 'completed',
    method: 'Credit Card'
  },
  {
    id: '2',
    type: 'debit',
    amount: -250,
    description: 'Session with Sarah Chen - Product Strategy',
    date: '2024-01-14',
    status: 'completed',
    method: 'Credits'
  },
  {
    id: '3',
    type: 'debit',
    amount: -300,
    description: 'Session with David Kim - Technical Architecture',
    date: '2024-01-12',
    status: 'completed',
    method: 'Credits'
  },
  {
    id: '4',
    type: 'credit',
    amount: 1000,
    description: 'Added credits for mentor sessions',
    date: '2024-01-10',
    status: 'completed',
    method: 'Bank Transfer'
  },
  {
    id: '5',
    type: 'debit',
    amount: -200,
    description: 'Session with Maria Rodriguez - Marketing Strategy',
    date: '2024-01-08',
    status: 'completed',
    method: 'Credits'
  }
];

// Mock credit packages
const creditPackages = [
  {
    id: '1',
    credits: 1,
    price: 250,
    savings: 0,
    popular: false
  },
  {
    id: '2',
    credits: 3,
    price: 700,
    savings: 50,
    popular: true
  },
  {
    id: '3',
    credits: 5,
    price: 1100,
    savings: 150,
    popular: false
  },
  {
    id: '4',
    credits: 10,
    price: 2000,
    savings: 500,
    popular: false
  }
];

export default function WalletPage() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showAddCredits, setShowAddCredits] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />;
  };

  const getTransactionColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCredits = () => {
    // This would integrate with your payment system
    console.log('Adding credits:', selectedPackage);
    setShowAddCredits(false);
    setSelectedPackage('');
  };

  const handleWithdraw = () => {
    // This would integrate with your withdrawal system
    console.log('Withdrawing:', { amount: withdrawAmount, method: withdrawMethod });
    setShowWithdraw(false);
    setWithdrawAmount('');
    setWithdrawMethod('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/surge/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Wallet & Credits</h1>
            <p className="text-muted-foreground">
              Manage your account balance and transaction history
            </p>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletData.balance}</div>
            <p className="text-xs text-muted-foreground">Available for sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{walletData.credits}</div>
            <p className="text-xs text-muted-foreground">1 credit = 1 hour session</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$750</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-4">
        <Dialog open={showAddCredits} onOpenChange={setShowAddCredits}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Credits to Your Account</DialogTitle>
              <DialogDescription>
                Choose a credit package to add to your account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid gap-3">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPackage === pkg.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{pkg.credits} Credit{pkg.credits > 1 ? 's' : ''}</div>
                        <div className="text-sm text-muted-foreground">${pkg.price}</div>
                        {pkg.savings > 0 && (
                          <div className="text-xs text-green-600">Save ${pkg.savings}</div>
                        )}
                      </div>
                      {pkg.popular && (
                        <Badge className="bg-blue-100 text-blue-800">Most Popular</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddCredits(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCredits} disabled={!selectedPackage}>
                  Add Credits
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Minus className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Withdraw your available balance to your preferred method.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={walletData.balance}
                />
                <p className="text-xs text-muted-foreground">
                  Available: ${walletData.balance}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Withdrawal Method</label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowWithdraw(false)}>
                  Cancel
                </Button>
                <Button onClick={handleWithdraw} disabled={!withdrawAmount || !withdrawMethod}>
                  Withdraw
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="packages">Credit Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)} • {transaction.method}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                          {transaction.type === 'credit' ? '+' : ''}${Math.abs(transaction.amount)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Packages</CardTitle>
              <CardDescription>Choose the best package for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {creditPackages.map((pkg) => (
                  <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{pkg.credits}</CardTitle>
                      <CardDescription>Credit{pkg.credits > 1 ? 's' : ''}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div>
                        <div className="text-3xl font-bold">${pkg.price}</div>
                        {pkg.savings > 0 && (
                          <div className="text-sm text-green-600">Save ${pkg.savings}</div>
                        )}
                      </div>
                      <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Purchase
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 