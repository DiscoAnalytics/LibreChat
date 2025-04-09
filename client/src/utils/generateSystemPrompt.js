// Mock prompts for testing, file supplied with draft prompts for everyone 
const departmentPrompts = {
    "Head Office": "You support strategic decision-making and cross-functional coordination.",
    "Product Development": "You assist with technical documentation, product insights, and roadmap alignment.",
    "Finance, HR and Admin": "You help with process accuracy, financial queries, and internal communication.",
    "Company Business Systems": "You support internal tools, data workflows, and business process optimisation.",
    "Technical Services": "You help with technical troubleshooting, service queries, and product manuals.",
    "Sales": "You assist with product knowledge, pricing clarity, and upsell opportunities.",
    "Marketing": "You support content planning, campaign alignment, and performance insights.",
};

export function generateSystemPrompt(user) {
    const name = user.name?.trim() || "Unnamed User";
    const title = user.job_title?.trim() || "Employee";
    const dept = user.department?.trim() || "Unknown Department";

    const deptLine = departmentPrompts[dept] || "You support the team's specific needs with clarity and efficiency.";

    return `You are an internal AI assistant supporting ${name}, ${title} in ${dept}. ${deptLine}`;
}
