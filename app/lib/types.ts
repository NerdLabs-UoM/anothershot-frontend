export type UserRole = 'CLIENT' | 'PHOTOGRAPHER' | 'ADMIN';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type ReportStatus = 'PENDING' | 'RESOLVED' | 'DISMISSED';

export type TestimonialVisibility = 'PUBLIC' | 'PRIVATE';

export type PhotographerCategory =
  | 'WEDDING'
  | 'PORTRAIT'
  | 'LANDSCAPE'
  | 'EVENT'
  | 'PRODUCT'
  | 'FASHION'
  | 'FOOD'
  | 'SPORT'
  | 'ARCHITECTURE'
  | 'WILDLIFE'
  | 'TRAVEL'
  | 'DOCUMENTARY'
  | 'STREET'
  | 'FAMILY'
  | 'NEWBORN'
  | 'MATERNITY'
  | 'PET'
  | 'BIRTHDAY'
  | 'BABY_SHOWER'
  | 'ENGAGEMENT'
  | 'ANNIVERSARY'
  | 'GRADUATION'
  | 'PROM'
  | 'BACHELOR'
  | 'BACHELORETTE'
  | 'REUNION'
  | 'RETIREMENT'
  | 'FUNERAL'
  | 'MEMORIAL'
  | 'RELIGIOUS'
  | 'CULTURAL'
  | 'POLITICAL'
  | 'MILITARY'
  | 'CHARITY'
  | 'FESTIVAL'
  | 'FAIR'
  | 'CONCERT'
  | 'CONFERENCE'
  | 'EXPO'
  | 'CONVENTION'
  | 'SEMINAR'
  | 'WORKSHOP'
  | 'RETREAT'
  | 'SUMMIT'
  | 'TRADE_SHOW'
  | 'MEETUP'
  | 'RALLY'
  | 'PROTEST'
  | 'MARCH'
  | 'PARADE';

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: User;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  userRole: UserRole;
  image: string;
  accounts: Account[];
  sessions: Session[];
  photographer?: Photographer | null;
  client?: Client | null;
  admin?: Admin | null;
  chats: Chat[];
  chatIds: string[];
  messagesSent: Message[];
  messagesReceived: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Photographer {
  id: string;
  user: User;
  userId: string;
  name: string;
  coverPhoto?: string | null;
  bio?: string | null;
  featured: string[];
  category: PhotographerCategory[];
  contactDetails?: ContactDetails | null;
  testimonial: Testimonial[];
  feed: FeedImage[];
  packages: Package[];
  albums: Album[];
  Bookings: Booking[];
  BankDetails?: BankDetails | null;
  Earnings?: Earnings | null;
  Report: Report[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  user: User;
  userId: string;
  name: string;
  testimonial: Testimonial[];
  Booking: Booking[];
  Report: Report[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  user: User;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  users: User[];
  userIds: string[];
  messages: Message[];
  messagesIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id?: string;
  chat?: Chat;
  chatId: string;
  sender: User;
  senderId: string;
  receiver: User;
  receiverId: string;
  message: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id?: string;
  message?: Message;
  messageId?: string;
  type?: string;
  url: string;
}

export interface Booking {
  id: string;
  client: Client;
  clientId: string;
  photographer: Photographer;
  photographerId: string;
  subject: string;
  category: PhotographerCategory;
  package: Package;
  packageId: string;
  payment?: string | null;
  date: Date;
  start?: Date | null;
  end?: Date | null;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankDetails {
  id: string;
  photographer: Photographer;
  photographerId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountBranch: string;
  accountBranchCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Earnings {
  id: string;
  photographer: Photographer;
  photographerId: string;
  totalAmount: number;
  pending: number;
  fees: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  id: string;
  client?: Client | null;
  clientId?: string | null;
  photographer?: Photographer | null;
  photographerId?: string | null;
  subject: string;
  description: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  id: string;
  photographer: Photographer;
  photographerId: string;
  name: string;
  description: string;
  coverPhotos: string[];
  price: number;
  Booking: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactDetails {
  id: string;
  photographer: Photographer;
  photographerId?: string;
  phoneNum1: string;
  phoneNum2?: string | null;
  email: string;
  address?: Address | null;
  socialMedia?: SocialMedia | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Address {
  id?: string;
  contactDetails?: ContactDetails;
  contactDetailsId?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SocialMedia {
  // contactDetails: ContactDetails;
  // contactDetailsId: string;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Testimonial {
  id: string;
  client: Client;
  clientId: string;
  photographer: Photographer;
  photographerId: string;
  visibility: TestimonialVisibility;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedImage {
  id: string;
  photographer: Photographer;
  photographerId: string;
  image: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  id: string;
  photographer: Photographer;
  photographerId: string;
  name: string;
  description: string;
  images: AlbumImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AlbumImage {
  id: string;
  album: Album;
  albumId: string;
  image: string;
  caption: string;
}

