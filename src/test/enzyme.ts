import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

// Configure Enzyme for the appropriate React adapter
Enzyme.configure({ adapter: new Adapter() });

// Re-export all enzyme exports
export * from "enzyme";
