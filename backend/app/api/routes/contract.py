from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

router = APIRouter()

class ContractAuditRequest(BaseModel):
    contract_address: str
    chain: str = "ethereum"
    contract_code: Optional[str] = None

class SecurityFinding(BaseModel):
    severity: str  # critical, high, medium, low, info
    title: str
    description: str
    recommendation: str
    line_number: Optional[int] = None

class GasOptimization(BaseModel):
    optimization: str
    potential_savings: str
    difficulty: str  # easy, medium, hard

class AuditReport(BaseModel):
    contract_address: str
    chain: str
    audit_date: str
    security_score: float  # 0-100
    findings: List[SecurityFinding]
    gas_optimizations: List[GasOptimization]
    overall_assessment: str
    recommendations: List[str]

def get_mock_audit_report(address: str, chain: str) -> AuditReport:
    """Generate mock audit report for testing"""
    return AuditReport(
        contract_address=address,
        chain=chain,
        audit_date=datetime.utcnow().isoformat() + "Z",
        security_score=87.5,
        findings=[
            SecurityFinding(
                severity="medium",
                title="Potential Reentrancy Vulnerability",
                description="External call before state update in transfer function",
                recommendation="Use checks-effects-interactions pattern",
                line_number=145
            ),
            SecurityFinding(
                severity="low",
                title="Missing Event Emission",
                description="Critical state changes not emitting events",
                recommendation="Add event emissions for all state changes",
                line_number=89
            ),
        ],
        gas_optimizations=[
            GasOptimization(
                optimization="Use uint256 instead of uint8 for loop counter",
                potential_savings="~500 gas per transaction",
                difficulty="easy"
            ),
            GasOptimization(
                optimization="Cache array length in loops",
                potential_savings="~200 gas per iteration",
                difficulty="easy"
            ),
        ],
        overall_assessment="Good security practices with minor improvements needed",
        recommendations=[
            "Implement formal verification for critical functions",
            "Add comprehensive test coverage (currently 78%)",
            "Consider external audit before mainnet deployment"
        ]
    )

@router.post("/audit", response_model=AuditReport)
async def audit_contract(request: ContractAuditRequest):
    """Perform AI-powered smart contract audit"""
    
    if not request.contract_address:
        raise HTTPException(status_code=400, detail="Contract address is required")
    
    # Mock mode
    if os.getenv("MOCK_MODE", "false") == "true":
        return get_mock_audit_report(request.contract_address, request.chain)
    
    # TODO: Implement real contract analysis
    # - Fetch contract source code
    # - Run static analysis tools
    # - Use AI for vulnerability detection
    # - Calculate gas optimization opportunities
    
    return get_mock_audit_report(request.contract_address, request.chain)

@router.get("/security-score/{address}")
async def get_security_score(address: str, chain: str = "ethereum"):
    """Get security score for contract"""
    report = get_mock_audit_report(address, chain)
    return {
        "address": address,
        "security_score": report.security_score,
        "findings_count": len(report.findings),
        "critical_issues": len([f for f in report.findings if f.severity == "critical"]),
        "high_issues": len([f for f in report.findings if f.severity == "high"])
    }
