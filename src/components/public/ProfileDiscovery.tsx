import React, { useState, useMemo } from 'react';
import { MatrimonialProfile } from '../../types';
import {
  Search,
  Filter,
  Grid,
  List,
  Heart,
  Send,
  ShieldCheck,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  RotateCcw,
  Eye,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ProfileDiscoveryProps {
  profiles: MatrimonialProfile[];
  onSelectProfile: (profile: MatrimonialProfile) => void;
  onSendProposal: (profile: MatrimonialProfile) => void;
  onToggleShortlist: (profileId: string) => void;
  shortlistedIds: string[];
  sentProposalProfileIds: string[];
  initialGenderFilter?: string;
  initialCountryFilter?: string;
  isHomePage?: boolean;
  onViewMore?: () => void;
}

export const ProfileDiscovery: React.FC<ProfileDiscoveryProps> = ({
  profiles,
  onSelectProfile,
  onSendProposal,
  onToggleShortlist,
  shortlistedIds,
  sentProposalProfileIds,
  initialGenderFilter,
  initialCountryFilter,
  isHomePage = false,
  onViewMore,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>(initialGenderFilter || 'All');
  const [countryFilter, setCountryFilter] = useState<string>(initialCountryFilter || 'All');
  const [professionFilter, setProfessionFilter] = useState<string>('All');
  const [maritalStatusFilter, setMaritalStatusFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchProf = p.profession.toLowerCase().includes(q);
        const matchEdu = p.education.toLowerCase().includes(q);
        const matchCity = p.presentCity.toLowerCase().includes(q);
        const matchId = p.profileId.toLowerCase().includes(q);
        if (!matchName && !matchProf && !matchEdu && !matchCity && !matchId) return false;
      }

      // Gender
      if (genderFilter !== 'All' && p.gender !== genderFilter) return false;

      // Country
      if (countryFilter !== 'All') {
        if (countryFilter === 'Bangladesh' && p.presentCountry !== 'Bangladesh') return false;
        if (countryFilter === 'USA' && p.presentCountry !== 'USA') return false;
        if (countryFilter === 'UK' && p.presentCountry !== 'UK') return false;
        if (countryFilter === 'Canada' && p.presentCountry !== 'Canada') return false;
        if (countryFilter === 'Australia' && p.presentCountry !== 'Australia') return false;
      }

      // Profession
      if (professionFilter !== 'All') {
        if (professionFilter === 'Doctor' && !p.profession.toLowerCase().includes('doctor')) return false;
        if (professionFilter === 'Engineer' && !p.profession.toLowerCase().includes('engineer')) return false;
        if (professionFilter === 'Corporate' && !p.jobType.toLowerCase().includes('multinational') && !p.jobType.toLowerCase().includes('private')) return false;
      }

      // Marital
      if (maritalStatusFilter !== 'All' && p.maritalStatus !== maritalStatusFilter) return false;

      return true;
    });
  }, [profiles, searchTerm, genderFilter, countryFilter, professionFilter, maritalStatusFilter]);

  // On home page, strictly display the first 3 profiles; on directory page, use filtered profiles
  const displayedProfiles = isHomePage ? profiles.slice(0, 3) : filteredProfiles;

  const resetFilters = () => {
    setSearchTerm('');
    setGenderFilter('All');
    setCountryFilter('All');
    setProfessionFilter('All');
    setMaritalStatusFilter('All');
  };

  return (
    <section id="profiles-section" className="relative overflow-hidden bg-gradient-to-br from-[#02061f] via-[#000080]/90 to-[#040827] text-white py-10 sm:py-14 transition-all duration-300 -mt-1">
      {/* Dynamic Animated Shifting Background Glow & Mesh matching Hero / Country sections */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030722] via-[#000080]/80 to-[#04092b] animate-color-shift pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-[#000080]/50 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-[#000080]/40 via-[#E60000]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] sm:text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{isHomePage ? 'Featured Matches' : 'Verified Matrimonial Catalog'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              {isHomePage ? 'Featured Profiles' : 'Discover Dignified Matches'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto sm:mx-0">
              {isHomePage
                ? 'Handpicked and verified biodatas ready for meaningful matrimonial connections.'
                : 'Browse thoroughly vetted candidate biodatas across Bangladesh and the global diaspora.'}
            </p>
          </div>

          {/* Top-right Action: "See More" on Home, or View Mode Toggle on Find Match */}
          {isHomePage && onViewMore ? (
            <button
              onClick={onViewMore}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D91B2B] to-[#b91422] hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-900/40 transition-all group shrink-0 self-center sm:self-auto"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : !isHomePage ? (
            /* View mode toggle and counter */
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                Showing <strong className="text-[#16205B]">{filteredProfiles.length}</strong> Profiles
              </span>
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-[#16205B] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-[#16205B] text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Filter Bar - Hidden on Home Screen as requested */}
        {!isHomePage && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-8 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Input */}
              <div className="relative lg:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, SK-ID, degree, or city..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#16205B]/20 focus:border-[#16205B] text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Gender Filter */}
              <div>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#16205B]/20 text-slate-700 font-medium"
                >
                  <option value="All">All Genders (Bride & Groom)</option>
                  <option value="Female">Bride (পাত্রী)</option>
                  <option value="Male">Groom (পাত্র)</option>
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#16205B]/20 text-slate-700 font-medium"
                >
                  <option value="All">All Locations</option>
                  <option value="Bangladesh">🇧🇩 Bangladesh</option>
                  <option value="USA">🇺🇸 USA Expats</option>
                  <option value="UK">🇬🇧 UK Expats</option>
                  <option value="Canada">🇨🇦 Canada Expats</option>
                  <option value="Australia">🇦🇺 Australia Expats</option>
                </select>
              </div>

              {/* Profession Filter */}
              <div>
                <select
                  value={professionFilter}
                  onChange={(e) => setProfessionFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#16205B]/20 text-slate-700 font-medium"
                >
                  <option value="All">All Professions</option>
                  <option value="Doctor">Doctors & Medical</option>
                  <option value="Engineer">Software & Engineers</option>
                  <option value="Corporate">Corporate & Banking</option>
                </select>
              </div>
            </div>

            {/* Active filter reset button */}
            {(searchTerm || genderFilter !== 'All' || countryFilter !== 'All' || professionFilter !== 'All') && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Filters applied to candidate directory</span>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[#D91B2B] hover:text-[#b91422] font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profiles Content */}
        {displayedProfiles.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-[#D91B2B] flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              No Matching Profiles Found
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find candidates matching your current criteria. Try expanding your age range, clearing specific filters, or searching for other districts.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#16205B] text-white text-xs font-bold rounded-xl hover:bg-[#0f1744] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : isHomePage || viewMode === 'grid' ? (
          /* GRID VIEW - On mobile view for Home Page: grid-cols-3 keeps all 3 profiles strictly in 1 line */
          <div
            className={
              isHomePage
                ? 'grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }
          >
            {displayedProfiles.map((p) => {
              const isShortlisted = shortlistedIds.includes(p.id);
              const hasSent = sentProposalProfileIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-2.5 sm:p-4 border border-white/90 shadow-2xl shadow-black/30 hover:shadow-2xl hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges Bar */}
                    <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
                      <span className="font-mono text-[7px] sm:text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 sm:px-2 py-0.5 rounded border border-slate-200">
                        {p.profileId}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={`text-[7px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.5 rounded ${
                          p.gender === 'Female' ? 'bg-rose-50 text-[#D91B2B] border border-rose-100' : 'bg-blue-50 text-[#16205B] border border-blue-100'
                        }`}>
                          {p.gender === 'Female' ? 'Bride' : 'Groom'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleShortlist(p.id);
                          }}
                          className={`p-1 sm:p-1.5 rounded-full transition-all ${
                            isShortlisted
                              ? 'bg-rose-500 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600'
                          }`}
                          title={isShortlisted ? 'Remove from shortlist' : 'Shortlist profile'}
                        >
                          <Heart className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${isShortlisted ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Circular Smart Profile Avatar */}
                    <div
                      onClick={() => onSelectProfile(p)}
                      className="relative mx-auto my-1 sm:my-2 cursor-pointer group/avatar w-fit"
                    >
                      <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden ring-2 sm:ring-4 ring-rose-500/20 group-hover/avatar:ring-rose-500 transition-all duration-300 shadow-md mx-auto bg-slate-100">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {p.isVerified && (
                        <div
                          className="absolute bottom-0 right-0 sm:right-1 bg-emerald-500 text-white p-0.5 sm:p-1 rounded-full ring-2 ring-white shadow-xs"
                          title="Verified Profile"
                        >
                          <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Candidate Name & Vital Specs */}
                    <div className="text-center my-1 sm:my-2">
                      <h3
                        onClick={() => onSelectProfile(p)}
                        className="text-[11px] sm:text-base font-bold text-slate-900 leading-tight truncate cursor-pointer hover:text-[#D91B2B] transition-colors"
                      >
                        {p.name}
                      </h3>
                      <p className="text-[8px] sm:text-xs text-slate-500 truncate mt-0.5">
                        {p.age} yrs • {p.height}
                      </p>
                    </div>

                    {/* Candidate Details */}
                    <div className="space-y-1 sm:space-y-1.5 text-[8px] sm:text-xs text-slate-600 my-1 sm:my-2 pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Briefcase className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#D91B2B] shrink-0" />
                        <span className="truncate font-medium text-slate-800">
                          {p.profession}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <GraduationCap className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#16205B] shrink-0" />
                        <span className="truncate text-slate-600">
                          {p.highestDegree}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate text-slate-600">
                          {p.presentCity}, {p.presentCountry}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 sm:pt-2.5 border-t border-slate-100 flex gap-1 sm:gap-2 mt-1 sm:mt-2">
                    <button
                      onClick={() => onSelectProfile(p)}
                      className="flex-1 py-1 sm:py-2 text-center text-[8px] sm:text-xs font-semibold rounded-md sm:rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-0.5 sm:gap-1"
                    >
                      <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">View </span>Bio
                    </button>
                    <button
                      onClick={() => onSendProposal(p)}
                      disabled={hasSent}
                      className={`flex-1 py-1 sm:py-2 text-center text-[8px] sm:text-xs font-bold rounded-md sm:rounded-xl transition-colors flex items-center justify-center gap-0.5 sm:gap-1 ${
                        hasSent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                          : 'bg-[#D91B2B] hover:bg-[#b91422] text-white shadow-2xs'
                      }`}
                    >
                      {hasSent ? (
                        <>
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="hidden sm:inline">Proposal</span>
                          <span className="sm:hidden">Send</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {displayedProfiles.map((p) => {
              const isShortlisted = shortlistedIds.includes(p.id);
              const hasSent = sentProposalProfileIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-5"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 bg-slate-100 ring-4 ring-rose-500/20 shadow-md">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 font-mono text-[8px] font-bold bg-black/70 text-white text-center py-0.5">
                      {p.profileId}
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="text-base font-bold text-slate-900 font-display">
                        {p.name}
                      </h3>
                      {p.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {p.gender === 'Female' ? 'Bride' : 'Groom'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      {p.age} Years • {p.height} • {p.maritalStatus} • {p.religion}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-800">
                        <Briefcase className="w-3.5 h-3.5 text-[#D91B2B]" />
                        {p.profession} ({p.jobTitle})
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#16205B]" />
                        {p.education}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {p.presentCity}, {p.presentCountry}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 pt-1">{p.bio}</p>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => onSelectProfile(p)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      View Biodata
                    </button>
                    <button
                      onClick={() => onSendProposal(p)}
                      disabled={hasSent}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold ${
                        hasSent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-[#D91B2B] hover:bg-[#b91422] text-white shadow-xs'
                      }`}
                    >
                      {hasSent ? 'Proposal Sent' : 'Send Proposal'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
