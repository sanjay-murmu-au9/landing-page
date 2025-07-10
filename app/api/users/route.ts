import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration - this would be replaced by API calls to your backend
const MOCK_USERS = [
  {
    _id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'Interested in a property tour for Prestige Somerville. I\'m looking for a 3BHK with lake view. Would like to discuss EMI options.',
    createdAt: '2025-06-28T10:30:00.000Z',
    propertyInterest: 'High',
    budget: '$800,000-$1,000,000',
    callStatus: 'Called',
    callNotes: 'Scheduled property tour for July 5th. Very interested in the premium floor plans. Has pre-approved mortgage.',
    preferredLocation: 'Lakefront facing'
  },
  {
    _id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+0987654321',
    message: 'Looking for investment opportunities in Prestige Somerville. Interested in multiple units for rental income.',
    createdAt: '2025-06-29T14:15:00.000Z',
    propertyInterest: 'Medium',
    budget: '$500,000-$700,000',
    callStatus: 'Not Called',
    callNotes: '',
    preferredLocation: 'City view'
  },
  {
    _id: '3',
    fullName: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+1122334455',
    message: 'Interested in 3BHK apartments with modern amenities. Is there a gym and swimming pool?',
    createdAt: '2025-06-25T09:45:00.000Z',
    propertyInterest: 'High',
    budget: '$1,000,000+',
    callStatus: 'Called',
    callNotes: 'Very interested, requested floor plans. Will bring family for site visit next weekend.',
    preferredLocation: 'Corner unit'
  },
  {
    _id: '4',
    fullName: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+5544332211',
    message: 'Looking for information about amenities and security features. We have young children and security is a priority.',
    createdAt: '2025-06-27T16:20:00.000Z',
    propertyInterest: 'Low',
    budget: 'Not disclosed',
    callStatus: 'Called',
    callNotes: 'Just gathering information, not ready to buy yet. May consider in 3-6 months.',
    preferredLocation: 'Not specific'
  },
  {
    _id: '5',
    fullName: 'Robert Brown',
    email: 'robert@example.com',
    phone: '+9988776655',
    message: 'Interested in payment plans and financing options. Looking for a 2BHK with good investment potential.',
    createdAt: '2025-06-30T08:10:00.000Z',
    propertyInterest: 'High',
    budget: '$600,000-$900,000',
    callStatus: 'Not Called',
    callNotes: '',
    preferredLocation: 'Pool view'
  },
  {
    _id: '6',
    fullName: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1231231234',
    message: 'Relocating to Bangalore for work. Need a premium apartment close to tech park. Interested in Prestige Somerville location.',
    createdAt: '2025-06-29T18:45:00.000Z',
    propertyInterest: 'High',
    budget: '$900,000-$1,200,000',
    callStatus: 'Called',
    callNotes: 'Detailed discussion about floor plans. Very interested in the penthouse options. Wants to finalize in 2 weeks.',
    preferredLocation: 'Higher floor with city view'
  },
  {
    _id: '7',
    fullName: 'David Wilson',
    email: 'david@example.com',
    phone: '+9876543210',
    message: 'Interested in the zero EMI till 2027 offer. Can you provide more details about the payment structure?',
    createdAt: '2025-06-26T11:20:00.000Z',
    propertyInterest: 'Medium',
    budget: '$600,000-$800,000',
    callStatus: 'Follow Up Required',
    callNotes: 'Called once, needs more financial details. Send brochure with payment plans.',
    preferredLocation: 'East facing'
  },
  {
    _id: '8',
    fullName: 'Sophia Chen',
    email: 'sophia@example.com',
    phone: '+4567891230',
    message: 'Looking for luxury homes for my parents. Need accessibility features and elderly-friendly design.',
    createdAt: '2025-06-24T09:15:00.000Z',
    propertyInterest: 'High',
    budget: '$700,000-$900,000',
    callStatus: 'Called',
    callNotes: 'Detailed discussion about accessibility features. Very specific requirements about layout.',
    preferredLocation: 'Ground floor or with elevator access'
  },
  {
    _id: '9',
    fullName: 'James Thompson',
    email: 'james@example.com',
    phone: '+7778889999',
    message: 'Interested in Prestige Somerville for its reputation. Looking for a summer home with great views.',
    createdAt: '2025-06-22T16:40:00.000Z',
    propertyInterest: 'Low',
    budget: '$1,000,000+',
    callStatus: 'Not Called',
    callNotes: '',
    preferredLocation: 'Lakefront premium'
  },
  {
    _id: '10',
    fullName: 'Olivia Garcia',
    email: 'olivia@example.com',
    phone: '+3334445555',
    message: 'We\'re a young couple looking for our first home. Attracted to the amenities and location of Prestige Somerville.',
    createdAt: '2025-06-30T07:30:00.000Z',
    propertyInterest: 'Medium',
    budget: '$500,000-$600,000',
    callStatus: 'Called',
    callNotes: 'Budget-conscious but very interested. Looking for financing options. Scheduled for a virtual tour.',
    preferredLocation: 'Affordable units with good amenities access'
  },
  {
    _id: '11',
    fullName: 'William Lee',
    email: 'william@example.com',
    phone: '+6667778888',
    message: 'Foreign investor looking for premium property in Bangalore. Prestige brand is well-known internationally.',
    createdAt: '2025-06-28T12:50:00.000Z',
    propertyInterest: 'High',
    budget: '$1,500,000+',
    callStatus: 'Follow Up Required',
    callNotes: 'Initial discussion positive. Needs international payment options. Considering multiple units.',
    preferredLocation: 'Premium units on higher floors'
  },
  {
    _id: '12',
    fullName: 'Ava Martinez',
    email: 'ava@example.com',
    phone: '+2223334444',
    message: 'Looking for detailed information about the construction quality and materials used. Environmental certifications?',
    createdAt: '2025-06-25T15:10:00.000Z',
    propertyInterest: 'Medium',
    budget: '$700,000-$900,000',
    callStatus: 'Not Called',
    callNotes: '',
    preferredLocation: 'Eco-friendly options'
  }
];

// API endpoint to get all users
export async function GET() {
  try {
    // In a real implementation, this would call your backend API
    // const response = await fetch('https://your-backend-api.com/users');
    // const data = await response.json();
    
    // Using mock data for demonstration
    const users = MOCK_USERS;
    const totalUsers = users.length;
    
    return NextResponse.json({
      success: true,
      data: {
        users,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// API endpoint to register a new user
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { fullName, email, phone } = body;
    
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would call your backend API
    // const response = await fetch('https://your-backend-api.com/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });
    // const data = await response.json();
    
    // Using mock response for demonstration
    const newUser = {
      _id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: newUser
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create user' },
      { status: 500 }
    );
  }
}
