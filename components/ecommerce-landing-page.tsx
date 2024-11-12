'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Search, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignInButton, useUser, useClerk } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"


export function EcommerceLandingPageComponent() {
  const { signOut } = useClerk()
  const { isSignedIn, user, isLoaded } = useUser()
  const { toast } = useToast()
  const [hasShownLoginToast, setHasShownLoginToast] = useState(false)


  useEffect(() => {
    if (isLoaded && isSignedIn && !hasShownLoginToast) {
      const hasLoggedInThisSession = sessionStorage.getItem('hasLoggedIn')
      if (hasLoggedInThisSession === 'true') {
        toast({
          title: "Successfully logged in!",
          description: `Welcome back, ${user?.firstName ?? 'user'}!`,
        })
        setHasShownLoginToast(true)
        sessionStorage.removeItem('hasLoggedIn')
      }
    }
  }, [isSignedIn, isLoaded, user, toast, hasShownLoginToast])


  const handleLogout = () => {
    signOut().then(() => {
      toast({
        title: "Successfully logged out!",
        description: "We hope to see you again soon.",
      })
      setHasShownLoginToast(false)
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-bold">EcoShop</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Products <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Electronics</DropdownMenuItem>
                <DropdownMenuItem>Clothing</DropdownMenuItem>
                <DropdownMenuItem>Home & Garden</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">Deals</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-4 py-3 border-b">
                  {isSignedIn ? (
                    <>
                      <p className="text-sm font-medium text-gray-900">Hello {user.firstName}</p>
                      <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-900">Welcome</p>
                      <p className="text-sm text-gray-500">To access account and manage orders</p>
                      <SignInButton mode="modal">
                        <Button
                          className="w-full mt-2"
                          variant="default"
                          onClick={() => sessionStorage.setItem('hasLoggedIn', 'true')}
                        >
                          Login / Signup
                        </Button>
                      </SignInButton>
                    </>
                  )}
                </div>
                <DropdownMenuItem>
                  <Link href="/orders" className="w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/gift-cards" className="w-full">Gift Cards</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact" className="w-full">Contact Us</Link>
                </DropdownMenuItem>
                {isSignedIn && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to EcoShop</h1>
          <p className="text-xl mb-8">Discover eco-friendly products for a sustainable lifestyle</p>
          <Button size="lg" variant="secondary">
            Shop Now
          </Button>
        </section>

        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className="border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Product ${product}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Eco Product {product}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A sustainable product for your everyday needs.
                  </p>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Best Sellers</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Sale</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Sustainability</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Press</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Facebook</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Newsletter</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          © 2024 EcoShop. All rights reserved.
        </div>
      </footer>
    </div>
  )
}