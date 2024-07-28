const baseURL = '/api/v2'

const auth = '/auth'
const bookings = '/bookings'
const cities = '/cities'
const countries = '/countries'
const hotels = '/hotels'
const photos = '/photos'
const rooms = '/rooms'
const search = '/search'
const users = '/users'

const urls = {
    auth: {
        signIn: `${auth}/signIn`,
        signUp: `${auth}/signUp`,
        me: `${auth}/me`
    },
    bookings: {
        allBookings: `${bookings}`,
        bookingsForRoom: (roomId: string) => `${rooms}/${roomId}${bookings}`,
        bookingsByUserId: (userId: string) => `${bookings}/list/${userId}`,
        create: `${bookings}`,
        update: (bookingId: string) => `${bookings}/${bookingId}`,
        deleteBooking: (bookingId: string) => `${bookings}/${bookingId}`,
        updateState: (bookingId: string) => `${bookings}/${bookingId}/state`,
        cancelBooking: (bookingId: string) => `${bookings}/${bookingId}/cancel`,
    },
    cities: {
        allCities: `${cities}/all`,
        allEnabledCities: `${cities}`,
        citiesByCountryId: (countryId: string)=> `${countries}/all/${countryId}${cities}`,
        enabledCitiesByCountryId: (countryId: string)=> `${countries}/${countryId}${cities}`,
        byId: (cityId: string) => `${cities}/${cityId}`,
        create: `${cities}`,
        update: (cityId: string) => `${cities}/${cityId}`,
        disableCity: (cityId: string) => `${cities}/${cityId}/disable`,
        enableCity: (cityId: string) => `${cities}/${cityId}/enable`,
        deleteCity: (cityId: string) => `${cities}/${cityId}`
    },
    countries: {
        allCountries: `${countries}/all`,
        allEnabledCountries: `${countries}`,
        byId: (countryId: string) => `${countries}/${countryId}`,
        create: `${countries}`,
        update: (countryId: string) => `${countries}/${countryId}`,
        disableCountry: (countryId: string) => `${countries}/${countryId}/disable`,
        enableCountry: (countryId: string) => `${countries}/${countryId}/enable`,
        deleteCountry: (countryId: string) => `${countries}/${countryId}`
    },
    hotels: {
        allHotels: `${hotels}/all`,
        allEnabledHotels: `${hotels}`,
        hotelsByCountryId: (countryId: string) => `${countries}/all/${countryId}${hotels}`,
        enabledHotelsByCountryId: (countryId: string) => `${countries}/${countryId}${hotels}`,
        hotelsByCityId: (cityId: string) => `${cities}/all/${cityId}${hotels}`,
        enabledHotelsByCityId: (cityId: string) => `${cities}/${cityId}${hotels}`,
        byId: (hotelId: string) => `${hotels}/${hotelId}`,
        create: `${hotels}`,
        update: (hotelId: string) => `${hotels}/${hotelId}`,
        disableHotel: (hotelId: string) => `${hotels}/${hotelId}/disable`,
        enableHotel: (hotelId: string) => `${hotels}/${hotelId}/enable`,
        deleteHotel: (hotelId: string) => `${hotels}/${hotelId}`,
        addPhotos: (hotelId: string) => `${hotels}/${hotelId}${photos}`,
        deletePhoto: (hotelId: string) => `${hotels}/${hotelId}${photos}`
    },
    photos: {
        byId: (photoId: string)=> `${photos}/${photoId}`
    },
    rooms: {
        allRooms: `${rooms}/all`,
        allEnabledRooms: `${rooms}`,
        roomsByHotelId: (hotelId: string) => `${hotels}/all/${hotelId}${rooms}`,
        enabledRoomsByHotelId: (hotelId: string) => `${hotels}/${hotelId}${rooms}`,
        byId: (roomId: string) => `${rooms}/${roomId}`,
        allAvailableForPeriod: (hotelId: string) => `${hotels}/${hotelId}${rooms}`,
        create: `${rooms}`,
        update: (roomId: string) => `${rooms}/${roomId}`,
        disableRoom: (roomId: string) => `${rooms}/${roomId}/disable`,
        enableRoom: (roomId: string) => `${rooms}/${roomId}/enable`,
        deleteRoom: (roomId: string) => `${rooms}/${roomId}`
    },
    search: {
        bookingsByUserAndHotel: `${search}${bookings}`,
        hotelsWithAvailableRooms: `${search}${hotels}`
    },
    users: {
        allUsers: `${users}`,
        byId: (userId: string) => `${users}/${userId}`,
        updateRoles: (userId: string) => `${users}/${userId}`,
        disableUser: (userId: string) => `${users}/${userId}/disable`,
        enableUser: (userId: string) => `${users}/${userId}/enable`
    }
}

export {
    baseURL,
    urls
}