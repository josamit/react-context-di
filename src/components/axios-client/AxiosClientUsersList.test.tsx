import {User} from "../../clients/UserClient";
import {render} from "@testing-library/react";
import {StaticRouter} from "react-router";
import React from "react";
import {AxiosClientUsersList} from "./AxiosClientUsersList";
import { usersClient } from "../../clients";

jest.mock("../../clients")

describe("UsersClient-backed UsersList", () => {
    it("Can fetch a list of users", async () => {
        const users: User[] = [{id: "asd", name: "someone", fullName: "Some One"}]
        usersClient.getUsers = jest.fn().mockResolvedValue(users)

        const element = render(
            <StaticRouter>
                <AxiosClientUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("someone");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })

    it("Can handle loading error", async () => {
        usersClient.getUsers = jest.fn().mockRejectedValue(new Error("Something went wrong"))

        const element = render(
            <StaticRouter>
                <AxiosClientUsersList />
            </StaticRouter>
        )

        let item = await element.findByText("Couldn't fetch Users. Message: 'Something went wrong'");
        expect(item).toBeInTheDocument()
        expect(element.container).toMatchSnapshot()
    })
})