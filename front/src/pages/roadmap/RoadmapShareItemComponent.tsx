import { ChangeEvent, useState } from "react";
import { CloseButton, Form } from "react-bootstrap";
import { RoadmapModelSharesInner } from "roadmap-client-api";

interface IRoadmapShareItemProps {
    item: RoadmapModelSharesInner;
    handleRemove: (email: string) => void;
    handleChange: (email: string, readOnly: boolean) => void;
}

export default function RoadmapShareItem(props: IRoadmapShareItemProps) {

    const [value, setValue] = useState<boolean>(props.item.readOnly === 1);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        let aux: any;
        if (name === 'readOnly') {
            const target = e.target as HTMLInputElement; // Convertendo para HTMLInputElement
            aux = target.checked;

            setValue(aux);
            props.handleChange(props.item.userEmail, aux);
        }
    };

    return (
        <tr key={props.item.id}>
            <td>
                <small><CloseButton onClick={() => props.handleRemove(props.item.userEmail)} /></small> {props.item.userEmail}
            </td>
            <td>
                <Form.Check
                    type='switch'
                    id='shared-readonly'
                    name="readOnly"
                    checked={value}
                    onChange={handleChange}
                />
            </td>
        </tr>
    );

}