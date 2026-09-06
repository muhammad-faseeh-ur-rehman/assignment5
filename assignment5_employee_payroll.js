let employees = [
    {
        id: 1,
        name: "Ali",
        department: "IT",
        salary: 80000,
        bonuses: [5000, 3000],
        deductions: [2000]
    },
    {
        id: 2,
        name: "Ahmed",
        department: "HR",
        salary: 70000,
        bonuses: [4000],
        deductions: [1500]
    },
    {
        id: 3,
        name: "Usman",
        department: "IT",
        salary: 95000,
        bonuses: [7000, 3000],
        deductions: [4000]
    },
    {
        id: 4,
        name: "Hassan",
        department: "Finance",
        salary: 85000,
        bonuses: [5000],
        deductions: [2500]
    }
];

function totalBonuses(employee) {
    return employee.bonuses.reduce((sum, bonus) => sum + bonus, 0);
}

function totalDeductions(employee) {
    return employee.deductions.reduce((sum, deduction) => sum + deduction, 0);
}

function netSalary(employee) {
    return employee.salary + totalBonuses(employee) - totalDeductions(employee);
}

function getPayrollData(employee) {
    return {
        basicSalary: employee.salary,
        totalBonuses: totalBonuses(employee),
        totalDeductions: totalDeductions(employee),
        netSalary: netSalary(employee)
    };
}

function highestPaidEmployee() {
    return employees.reduce((highest, employee) =>
        netSalary(employee) > netSalary(highest) ? employee : highest
    );
}

function lowestPaidEmployee() {
    return employees.reduce((lowest, employee) =>
        netSalary(employee) < netSalary(lowest) ? employee : lowest
    );
}

function companyPayroll() {
    return employees.reduce((total, employee) =>
        total + netSalary(employee), 0
    );
}

function departmentPayroll(department) {
    return employees
        .filter(employee => employee.department === department)
        .reduce((total, employee) => total + netSalary(employee), 0);
}

function averageSalary() {
    return employees.reduce((total, employee) =>
        total + employee.salary, 0
    ) / employees.length;
}

function giveRaise() {
    employees.forEach(employee => {
        employee.salary *= 1.10;
    });
}

function employeesAboveAverage() {
    const average = averageSalary();

    return employees.filter(employee =>
        employee.salary > average
    );
}

function sortEmployeesBySalary() {
    return [...employees].sort((a, b) => b.salary - a.salary);
}

function groupByDepartment() {
    return employees.reduce((groups, employee) => {
        if (!groups[employee.department]) {
            groups[employee.department] = [];
        }

        groups[employee.department].push(employee);
        return groups;
    }, {});
}

function generatePayrollReport() {
    employees.forEach(employee => {
        const data = getPayrollData(employee);

        console.log(`
========================
       PAYROLL
========================
Employee: ${employee.name}
Department: ${employee.department}
Salary: ${data.basicSalary.toLocaleString()}
Bonus: ${data.totalBonuses.toLocaleString()}
Deduction: ${data.totalDeductions.toLocaleString()}
Net Salary: ${data.netSalary.toLocaleString()}
========================
        `);
    });
}

// TEST
console.log("Highest Paid:", highestPaidEmployee());
console.log("Lowest Paid:", lowestPaidEmployee());
console.log("Company Payroll:", companyPayroll());
console.log("IT Payroll:", departmentPayroll("IT"));
console.log("Average Salary:", averageSalary());
console.log("Above Average:", employeesAboveAverage());
console.log("Sorted:", sortEmployeesBySalary());
console.log("Grouped:", groupByDepartment());

generatePayrollReport();
