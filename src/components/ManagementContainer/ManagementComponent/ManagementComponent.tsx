import {useEffect, useState} from "react";

import {useAppSelector} from "../../../hooks";
import {ERole} from "../../../enums";
import {CountriesList} from "../CountriesList";
import {HotelsList} from "../HotelsList";
import {RoomsList} from "../RoomsList";
import {UsersList} from "../UsersList";
import {BookingsList} from "../BookingsList";
import {CitiesList} from "../CitiesList";

const ManagementComponent = () => {
    const {user} = useAppSelector(state => state.auth);
    const [roles, setRoles] = useState<ERole[]>([])

    useEffect(() => {
        if (user) {
            setRoles(user.roles)
        }
    }, [user]);

    return (
        <>
            {roles.includes(ERole.ROLE_MANAGER) &&
                <div>
                    <CountriesList/>
                    <CitiesList/>
                    <HotelsList/>
                    <RoomsList/>
                    <UsersList/>
                    <BookingsList/>
                </div>
            }
        </>
    );
};

export {
    ManagementComponent
}