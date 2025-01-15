import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pokemon Api System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive system for managing and analyzing Pokemon data. Access detailed statistics,
            manage Pokemon information, and visualize data distributions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="transform transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h2 className="text-xl font-semibold mb-2">Pokemon Management</h2>
              <p className="text-gray-600 mb-4">
                Easily manage Pokemon data with our intuitive interface.
              </p>
            </CardContent>
          </Card>

          <Card className="transform transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h2 className="text-xl font-semibold mb-2">Data Analytics</h2>
              <p className="text-gray-600 mb-4">
                Visualize Pokemon statistics and discover insights.
              </p>
            </CardContent>
          </Card>

          <Card className="transform transition-all hover:scale-105">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2">Secure Access</h2>
              <p className="text-gray-600 mb-4">
                Protected admin interface with secure authentication.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Access Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}