import Layout from "antd/es/layout/layout";
import { PropsWithChildren } from "react";
import "./private.css"

export default function LayoutPrivate ({ children }: Readonly<PropsWithChildren>) {
    return (
        <div className="private-layout">
            { children }
        </div>
    );
}