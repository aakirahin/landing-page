import { Checkbox } from "../ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "../ui/field"

const FeatureFour = () => {
    const checkboxClass = "data-checked:border-[#0084FF] data-checked:bg-[#0084FF]"

    return (
        <FieldGroup className="w-full">
            <FieldSet>
                <FieldLegend variant="label" className="text-subtle">
                    Connected Apps
                </FieldLegend>
                <FieldDescription>
                    Select which apps to connect to your workspace.
                </FieldDescription>
                <FieldGroup className="gap-3">
                    <Field orientation="horizontal">
                        <Checkbox id="integration-slack" className={checkboxClass} defaultChecked />
                        <FieldLabel
                            htmlFor="integration-slack"
                            className="font-normal"
                        >
                            Slack
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="integration-google-workspace" className={checkboxClass} defaultChecked />
                        <FieldLabel
                            htmlFor="integration-google-workspace"
                            className="font-normal"
                        >
                            Google Workspace
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="integration-zapier" className={checkboxClass} />
                        <FieldLabel
                            htmlFor="integration-zapier"
                            className="font-normal"
                        >
                            Zapier
                        </FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                        <Checkbox id="integration-github" className={checkboxClass} />
                        <FieldLabel
                            htmlFor="integration-github"
                            className="font-normal"
                        >
                            GitHub
                        </FieldLabel>
                    </Field>
                </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <Field orientation="horizontal">
                <Checkbox id="integration-auto-sync" className={checkboxClass} defaultChecked />
                <FieldContent>
                    <FieldLabel htmlFor="integration-auto-sync" className="text-subtle">
                        Auto-sync across integrations
                    </FieldLabel>
                    <FieldDescription>
                        Automatically sync data between your connected apps in real time.
                        Changes in one app will reflect across all linked services.
                    </FieldDescription>
                </FieldContent>
            </Field>
        </FieldGroup>
    )
}

export default FeatureFour